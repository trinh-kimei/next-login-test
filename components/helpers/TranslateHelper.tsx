import { useRouter } from 'next/router';
import { LANGUAGES } from '../lang';

export default function TranslateHelper (nameId: string) {
    const { locale } = useRouter();
    if (Object.prototype.hasOwnProperty.call(LANGUAGES.en_US.messages, nameId)) {
        let message = '';
        switch (locale) {
            case 'en':
                message = (LANGUAGES.en_US.messages as any)[nameId];
                break;
            case 'vi':
                message = (LANGUAGES.vi_VN.messages as any)[nameId];
                break;
            default:
                message = (LANGUAGES.en_US.messages as any)[nameId];
                break;
        }
        return message;
    } else {
        return 'undefined';
    }
}
