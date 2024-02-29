import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import jsPDF from 'jspdf';
import PersonalData from '../assets/data.json';

import {ExperienceComponent} from './components/experience/experience.component';
import {HeaderComponent} from './components/header/header.component';
import {InformationsComponent} from './components/informations/informations.component';
import {calibri_bold} from "./jspdf-fonts/calibri-bold";
import {calibri_normal} from "./jspdf-fonts/calibri-normal";
import {Data} from './model/data.model';


enum PdfBuildAction {
    DOWNLOAD,
    OPEN_IN_NEW_TAB
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NgIf,
        DatePipe,
        InformationsComponent,
        HeaderComponent,
        ExperienceComponent,
        NgForOf,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    data: Data = undefined;

    @ViewChild('cvRoot', {static: false}) public cvRoot: ElementRef;

    ngOnInit(): void {
        this.data = PersonalData as unknown as Data;
        console.log("Data loaded");
    }

    openInNewTab(): void {
        this.buildPdf(PdfBuildAction.OPEN_IN_NEW_TAB);
    }

    downloadAsPdf(): void {
        this.buildPdf(PdfBuildAction.DOWNLOAD);
    }

    private buildPdf(action: PdfBuildAction): void {
        console.log(`Building PDF with action: ${action}`);
        const rootElement = this.cvRoot.nativeElement;
        const width = rootElement.getBoundingClientRect().width;
        const height = rootElement.getBoundingClientRect().height;


        const pdf = new jsPDF('p', 'px', [width, height]);
        pdf.addFileToVFS('calibri.ttf', calibri_normal);
        pdf.addFont('calibri.ttf', 'calibri', 'normal');
        pdf.addFileToVFS('calibri.ttf', calibri_bold);
        pdf.addFont('calibri.ttf', 'calibri', 'bold');
        pdf.setFont('calibri', 'normal');
        pdf.html(rootElement, {
            callback: (pdf) => {
                //keep only the first page
                while (pdf.internal["getNumberOfPages"]() > 1) {
                    pdf.deletePage(2);
                }

                const rootElementOffset = rootElement.getBoundingClientRect();
                rootElement.querySelectorAll("a").forEach((a) => {
                    const rect = a.getBoundingClientRect();
                    pdf.link(rect.left - rootElementOffset.left, rect.top - rootElementOffset.top, a.offsetWidth, a.offsetHeight, {
                        url: a.href,
                        isInternal: a.href.startsWith("data:")
                    });
                    // for debug
                    //pdf.rect(rect.left - rootElementOffset.left, rect.top - rootElementOffset.top, a.offsetWidth, a.offsetHeight, "S");
                });

                pdf.setProperties({
                    author: this.data.personal.firstName + " " + this.data.personal.lastName,
                    title: "Curriculum Vitae de " + this.data.personal.firstName + " " + this.data.personal.lastName,
                    creator: this.data.personal.sourcesLink,
                });


                switch (action) {
                    case PdfBuildAction.DOWNLOAD:
                        this.downloadPdf(pdf);
                        break;
                    case PdfBuildAction.OPEN_IN_NEW_TAB:
                        this.openPdfInNewTab(pdf);
                        break;
                }

                // Must reload the page to avoid a bug with the PDF rendering if it renders multiple times. Don't know why the image disappears.
                this.reloadPage();
            },
        });
    }

    private reloadPage(): void {
        window.location.reload();
    }

    private openPdfInNewTab(pdf: jsPDF) {
        window.open(pdf.output('bloburl'), '_blank');
    }

    private downloadPdf(pdf: jsPDF) {
        pdf.save(
            'CV_' +
            this.data.personal.firstName.toUpperCase() +
            '_' +
            this.data.personal.lastName.toUpperCase() +
            '.pdf',
        );
    }
}
