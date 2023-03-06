import { axiosPrivate } from "./axiosInstance"

export default {
    //For vendors
    getVendors(){
        return axiosPrivate.get("/private/vendor");
    },

    addVendor(payload){
        return axiosPrivate.post("/private/vendor", payload);
    },

    editVendor(payload){
        return axiosPrivate.put("/private/vendor/" + payload._id, payload);
    },

    deleteVendor(id){
        return axiosPrivate.delete("/private/vendor/" + id);
    },

    //For drugs

    getDrugs(){
        return axiosPrivate.get("/private/drug");
    },

    addDrug(payload){
        return axiosPrivate.post("/private/drug", payload);
    },

    editDrug(payload){
        return axiosPrivate.put("/private/drug/" + payload._id, payload);
    },

    deleteDrug(id){
        return axiosPrivate.delete("/private/drug/" + id);
    },
};