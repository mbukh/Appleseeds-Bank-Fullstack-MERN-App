export const userFields = {
    details: { title: "Details", align: "center", render: false, type: "boolean" },
    active: { title: "Active Status", align: "center", render: false, type: "boolean" },
    name: {
        title: "User Name",
        align: "left",
        render: true,
        register: true,
        type: "text",
    },
    age: {
        title: "Age",
        align: "center",
        render: true,
        register: true,
        short: true,
        type: "number",
    },
    passportId: {
        title: "Passport ID",
        align: "right",
        render: true,
        register: true,
        short: true,
        type: "text",
    },
    email: {
        title: "Email",
        align: "center",
        render: true,
        register: true,
        type: "email",
    },
    totalCash: { title: "Total Cash", align: "right", render: true, type: "number" },
    totalCredit: { title: "Total Credit", align: "right", render: true, type: "number" },
    createdAt: { title: "Registration Date", align: "right", render: true, type: "number" },
};

export const accountFields = {
    id: { title: "Account ID", align: "right", render: true, type: "text" },
    cash: { title: "Cash", align: "right", render: true, type: "number" },
    credit: { title: "Credit", align: "right", render: true, type: "number" },
    createdAt: {
        title: "Account Opening Date",
        align: "right",
        render: true,
        type: "date",
    },
    updatedAt: { title: "Last Transaction", align: "right", render: true, type: "date" },
};
