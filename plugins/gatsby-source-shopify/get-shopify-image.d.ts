import { IUrlBuilderArgs, IGetImageDataArgs, IGatsbyImageData } from "gatsby-plugin-image";
export interface IShopifyImage {
    width: number;
    height: number;
    originalSrc: string;
}
export interface IGetShopifyImageArgs extends Omit<IGetImageDataArgs, "urlBuilder" | "baseUrl" | "formats" | "sourceWidth" | "sourceHeight"> {
    image: IShopifyImage;
}
export declare function urlBuilder({ width, height, baseUrl, format, }: IUrlBuilderArgs<unknown>): string;
export declare function getShopifyImage({ image, ...args }: IGetShopifyImageArgs): IGatsbyImageData;
