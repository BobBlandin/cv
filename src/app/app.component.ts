import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import jsPDF from 'jspdf';
import PersonalData from '../assets/bob_blandin.json';

import {ExperienceComponent} from './components/experience/experience.component';
import {HeaderComponent} from './components/header/header.component';
import {InformationsComponent} from './components/informations/informations.component';
import {calibri_bold} from "./jspdf-fonts/calibri-bold";
import {calibri_normal} from "./jspdf-fonts/calibri-normal";
import {Data} from './model/data.model';

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
    downloaded = false;

    @ViewChild('cvRoot', {static: false}) public cvRoot: ElementRef;

    ngOnInit(): void {
        this.data = PersonalData as unknown as Data;
        console.log("Data loaded");
    }

    downloadAsPdf(): void {
        console.log("Download as PDF");
        const rootElement = this.cvRoot.nativeElement;
        const width = rootElement.getBoundingClientRect().width;
        const height = rootElement.getBoundingClientRect().height;


        // Add 0.5 to height to avoid a new blank page
        const pdf = new jsPDF('p', 'px', [width, height + 0.5]);
        pdf.addFileToVFS('calibri.ttf', calibri_normal);
        pdf.addFont('calibri.ttf', 'calibri', 'normal');
        pdf.addFileToVFS('calibri.ttf', calibri_bold);
        pdf.addFont('calibri.ttf', 'calibri', 'bold');

        pdf.setFont('calibri', 'normal');
        //
        pdf.html(rootElement, {
            callback: (pdf) => {
                rootElement.querySelectorAll("a").forEach((a) => {
                    pdf.link(a.offsetLeft, a.offsetTop, a.offsetWidth, a.offsetHeight, {url: a.href});
                });

                // window.open(pdf.output('bloburl'), '_blank');
                pdf.save(
                    'CV_' +
                    this.data.personal.firstName.toUpperCase() +
                    '_' +
                    this.data.personal.lastName.toUpperCase() +
                    '.pdf',
                );
                this.downloaded = true;
            },
        });
    }
}
