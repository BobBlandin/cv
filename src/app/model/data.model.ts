export interface Data {
    personal: Personal;

    photo: string;

    contact: Contact;
    competences: Competence[];
    formations: Formation[];
    others: Other[];
    experiences: Experience[];
}

export interface Other {
    value: string;
    link?: string;
}

export interface Personal {
    firstName: string;
    lastName: string;
    birthDate: string;
    description: string;
    job: string;
    sourcesLink: string;
    sourcesQRCode: string;
}

export interface Contact {
    mail: string;
    phone: string;
    address: string;
}

export interface Competence {
    type: string;
    names: string[];
}

export interface Formation {
    date: string;
    name: string;
    description: string;
    file?: string;
}

export interface Experience {
    period: string;
    company: string;
    title: string;
    description: string;
    tasks: string[];
}