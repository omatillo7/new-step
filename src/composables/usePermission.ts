import { createMongoAbility } from '@casl/ability';

interface IFormattedRules {
    action: string;
    subject: string;
}

const ability = createMongoAbility();

export const usePermission = () => {
    const update = (permissions: string[]) => {
        let formattedRules: IFormattedRules[] | any = [];

        if (permissions.length > 0) {
            formattedRules = permissions.map((per: string) => {
                const formattedObj: any = {};
                formattedObj.action = per;
                formattedObj.subject = 'permissions';
                return formattedObj;
            });

            ability.update(formattedRules);
        }
    }

    const logOut = () => {
        ability.update([{ action: 'read', subject: 'all' }]);
    };

    const can = (action: string) => true || ability.can(action, 'permissions')


    const isVisibleMenu = (item: any): boolean => {
        return true;

        let bool: boolean = false;
        if (Array.isArray(item)) {
            item.forEach((el) => {
                bool = bool || can(el);
            });
            return bool;
        } else if (typeof item === 'string') {
            return (bool = can(item));
        } else if (typeof item === 'boolean') {
            return (bool = true);
        } else {
            console.log(bool);
            return bool;
        }
    };

    return {
        logOut,
        ability,
        can,
        update,
        isVisibleMenu
    };
};