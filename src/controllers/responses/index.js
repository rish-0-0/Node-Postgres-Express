export function unauthorized (res, error) {
    res.status(401).json({
        success: false,
        message: "Unauthorized Acess",
        errors: error,
    });
}

export function missingBody (res, msg) {
    res.status(400).json({
        success: false,
        message: msg || "Missing required parameters/Invalid parameters",
        result: null,
    });
}

export function errorResponse (res, err, status, msg) {
    console.log("ERROR OCURRED:", err);
    res.status(status || 501).json({
        success: false,
        message: msg || err.message || "Internal Server Error.",
        info: err,
    });
}

export function successResponse (res, data, msg) {
    res.status(200).json({
        success: true,
        message: msg || "Success",
        result: data,
    });
}

export function alreadyRegistered (res, msg) {
    res.status(200).json({
        success: true,
        message: msg || "Already registered",
        result: null,
    });
}