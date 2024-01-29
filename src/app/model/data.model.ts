export interface Data {
    personal: Personal;

    photo: string;

    contact: Contact;
    competences: Competence[];
    formations: Formation[];
    others: string[];
    experiences: Experience[];
}

export interface Personal {
    firstName: string;
    lastName: string;
    birthDate: string;
    description: string;
    job: string;
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
}

export interface Experience {
    period: string;
    company: string;
    title: string;
    description: string;
    tasks: string[];
}