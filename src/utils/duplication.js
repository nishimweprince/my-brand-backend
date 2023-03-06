const checkDuplication = (modal, data) => {

    const blog = modal.findOne(data);

    if (blog) {
        return true;
    }

    else {
        return false;
    }

}

export default checkDuplication;