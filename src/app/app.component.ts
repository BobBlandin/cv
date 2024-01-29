import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import PersonalData from "../assets/bob_blandin.json";
import {ExperienceComponent} from "./components/experience/experience.component";
import {HeaderComponent} from "./components/header/header.component";
import {InformationsComponent} from "./components/informations/informations.component";
import {Data} from "./model/data.model";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgIf, DatePipe, InformationsComponent, HeaderComponent, ExperienceComponent, NgForOf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    data: Data | undefined = undefined;


    ngOnInit(): void {
        this.data = PersonalData as unknown as Data;
    }
}
