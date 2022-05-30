export interface Film {
    id?:string;
    dateCreation:any;
    auteur:string;
    email:string;
    titre:string;
    accroche:string;
    genre: string[];
    pitch:string;
    note:string;
    casting:any[];
    nbStarsPublic:number;
    nbVotesPublic: number;
    nbStarsAdmin:number;
    //affiche?:Buffer;
    published: boolean;
    score: number;
    classe:string;
    url:string[];
    bonus?:any;
}
