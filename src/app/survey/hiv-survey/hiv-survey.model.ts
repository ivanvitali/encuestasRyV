export interface HivSurvey {
    
    email?: string;
    age: number;
    gender: string;
    civilStatus: string;
    instruction: string;
    location: {
        country: string,
        state: string,
        city: string,
        district: string
    };
    answer1: {
        family: boolean,
        university: boolean,
        brochure: boolean,
        internet: boolean,
        magazine: boolean,
        tv: boolean,
        institution: boolean,
        school: boolean,
        personalResearch: boolean,
        friend: boolean,
        radio: boolean,
        book: boolean,
        hospital: boolean,
        publicRoad: boolean,
        newspaper: boolean,
        other: boolean
    }

}