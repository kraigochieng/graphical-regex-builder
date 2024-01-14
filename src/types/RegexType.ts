import RegexTypeEnum from "../enums/RegexTypeEnum";
import RepetitionType from "./RepetitionType";

type RegexType = {
    id: string,
    type: RegexTypeEnum | null,
    isCaseSensistive: boolean | null,
    repetition: RepetitionType | null,
    value: null
}

export default RegexType