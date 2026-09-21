const linkBuilder = (employeeId, include = []) => {
    const links = {};
    const base = '/api/v1/employees';

    if(include.includes("self")){
        links.self = {
            href: `${base}/${employeeId}`,
            method: 'GET'
        }
    }

    if(include.includes("uploadPhoto")){
        links.uploadPhoto = {
            href: `${base}/${employeeId}/photo`,
            method: 'POST'
        }
    }

    if(include.includes("update")){
        links.update = {
            href: `${base}/${employeeId}`,
            method: 'PATCH'
        }
    }

    if(include.includes("delete")){
        links.delete = {
            href:`${base}/${employeeId}`,
            method: 'DELETE'
        }
    }

    if(include.includes("generateNewQRcode")){
        links.generateNewQRcode = {
            href: `${base}/${employeeId}/qrcode`,
            method: 'POST'
        }
    }

    if(include.includes("getAttendances")){
        links.getAttendances = {
            href: `${base}/${employeeId}/attendances`,
            method: 'GET'
        }
    }

    return links;
}

export default linkBuilder;