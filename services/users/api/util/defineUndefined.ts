export default (data: object) => {
    Object.keys(data).map((key) => {
        //@ts-ignore
        if (data[key] == '') {
        //@ts-ignore
            data[key] = undefined;
        }
    });

    return data;
};
