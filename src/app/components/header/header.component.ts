import {NgForOf} from "@angular/common";
import {Component, Input, OnChanges} from "@angular/core";
import {I18nDirective} from "../../directives/i18n.directive";
import {Personal} from "../../model/data.model";

@Component({
    selector: 'cv-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        NgForOf,
        I18nDirective
    ],
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnChanges {
    @Input() personal: Personal;
    formattedDescription: string;


    ngOnChanges(): void {
        this.setupFormattedDescription();
    }

    // ngOnInit(): void {
    //     this.setupFormattedDescription();
    // }

    private setupFormattedDescription() {
        const age = Math.floor((new Date().getTime() - new Date(this.personal.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
        this.formattedDescription = this.personal.description.replace("${AGE}", age.toString());
    }
}