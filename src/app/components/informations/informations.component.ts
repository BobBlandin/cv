import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {I18nDirective} from "../../directives/i18n.directive";
import {Competence, Contact, Formation, Other} from "../../model/data.model";

@Component({
    selector: 'cv-informations',
    templateUrl: './informations.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgOptimizedImage,
        NgIf,
        I18nDirective
    ],
    styleUrl: './informations.component.scss'
})
export class InformationsComponent {
    @Input() photo: string;
    @Input() contact: Contact;
    @Input() competences: Competence[];
    @Input() formations: Formation[];
    @Input() others: Other[];
    protected readonly window = window;
}