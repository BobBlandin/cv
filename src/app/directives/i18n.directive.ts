import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {TranslationsService} from "../services/translations.service";

@Directive({
    selector: '[cvI18n]',
    standalone: true
})
export class I18nDirective implements OnChanges, OnInit {
    @Input() cvI18n = '';
    @Input() cvI18nAttribute? = 'innerHTML';

    constructor(private elementRef: ElementRef, private i18nService: TranslationsService, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.process();
    }

    ngOnChanges(): void {
        this.process();
    }

    private process(): void {
        const translation = this.i18nService.getTranslation(this.cvI18n);
        this.renderer.setProperty(this.elementRef.nativeElement, this.cvI18nAttribute, translation);
    }
}
