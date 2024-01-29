import {NgForOf} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Experience} from "../../model/data.model";

@Component({
    selector: 'cv-experience',
    templateUrl: './experience.component.html',
    standalone: true,
    imports: [
        NgForOf
    ],
    styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
    @Input() experience: Experience;
}