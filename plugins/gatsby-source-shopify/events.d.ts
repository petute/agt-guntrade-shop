interface IEvent {
    subject_id: number;
    subject_type: string;
}
export declare function eventsApi(options: ShopifyPluginOptions): {
    fetchDestroyEventsSince: (date: Date) => Promise<Array<IEvent>>;
};
export {};
