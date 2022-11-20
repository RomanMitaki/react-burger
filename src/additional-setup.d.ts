declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module "*.png" {
    const path: string;
    export default path;
}