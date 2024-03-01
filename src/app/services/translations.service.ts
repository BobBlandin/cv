import {Injectable} from "@angular/core";
import I18N_EN from "../../assets/i18n_en.json";
import I18N_FR from "../../assets/i18n_fr.json";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TranslationsService {
    private readonly translations: Map<string, string> = new Map<string, string>();

    constructor() {
        this.initTranslations();
    }

    private initTranslations(): void {
        // get from environment the lang to use
        // then load the translations
        const lang = environment.lang;
        const dictionary = lang === 'en' ? I18N_EN : I18N_FR;

        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                this.translations.set(key, dictionary[key]);
            }
        }
        console.log("Translations loaded, size: " + this.translations.size);
    }

    public getTranslation(key: string): string {
        return this.translations.get(key);
    }
}