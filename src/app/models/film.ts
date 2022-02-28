export interface Film {
    id?:string;
   // dateCreation:any;
    auteur:string;
    email:string;
    titre:string;
    accroche:string;
    genre: string[];
    pitch:string;
    note:string;
    casting:string;
    nbStarsPublic:number;
    nbVotesPublic: number;
    nbStarsAdmin:number;
    nbVotesAdlin:number;
    affiche?:Buffer;
    published: boolean;

}
