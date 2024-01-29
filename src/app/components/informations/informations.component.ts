import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Competence, Contact, Formation} from "../../model/data.model";

@Component({
    selector: 'cv-informations',
    templateUrl: './informations.component.html',
    standalone: true,
    imports: [
        NgForOf,
        NgOptimizedImage
    ],
    styleUrl: './informations.component.scss'
})
export class InformationsComponent {
    @Input() photo: string;
    @Input() contact: Contact;
    @Input() competences: Competence[];
    @Input() formations: Formation[];
    @Input() others: string[];
}