export const formatOrderStatus = (orderStatus: string): string | null => {
    switch (orderStatus) {
        case "created":
            return "Создан";
        case "pending":
            return "Готовится";
        case "done":
            return "Выполнен";
        case "cancel":
            return "Отменен";
        default:
            return null;
    }
};
