import { InvalidInputObjectError } from "../../constants/errors.constants";

export interface ChannelData {
    name: string;
    creationDate: Date;

    profileImageURL?: string;
    info?: string;
}

export class Channel implements ChannelData {
    name: string;
    creationDate: Date;
    profileImageURL?: string;
    info?: string;

    constructor(dataObject: Partial<ChannelData>) {
        if (!dataObject.name)
            throw new InvalidInputObjectError();

        this.name = dataObject.name;
        this.creationDate = dataObject.creationDate ? new Date(dataObject.creationDate) : new Date();
        this.profileImageURL = dataObject.profileImageURL || 'https://www.veryicon.com/download/png/miscellaneous/forestry-in-yiliang/group-people?s=512';
        this.info = dataObject.info || undefined;
    }

    toJSON(): any {
        return {
            name: this.name,
            creationDate: this.creationDate.toISOString(), 
            profileImageURL: this.profileImageURL, 
            info: this.info
        }
    }
}