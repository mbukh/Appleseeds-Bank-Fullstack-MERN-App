export const parseDate = (dateString, options = { time: false }) => {
    const date = new Date(dateString);
    const { time } = options;

    return date.toLocaleString("en-IL", {
        day: "numeric",
        month: time ? "numeric" : "long",
        year: "numeric",
        ...(time && { hour: "numeric" }),
        ...(time && { minute: "numeric" }),
    });
};

export const renderValue = (entry, key) => {
    if (key === "id") return "..." + entry[key].slice(-6);
    if (key === "updatedAt" && entry.createdAt === entry.updatedAt) return "never";
    if (key === "createdAt" || key === "updatedAt")
        return parseDate(entry[key], { time: key === "updatedAt" });
    return entry[key];
};
