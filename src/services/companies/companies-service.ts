import { CompanyEditOrCreateData } from "../../interfaces/CompanyCreateData";
import { CompanyData } from "../../interfaces/CompanyData";
import { CompanyResponseData } from "../../interfaces/CompanyResponseData";
import api from "../api";

async function postCreateCompany(userId: string, params: CompanyEditOrCreateData) {
    console.log({userId, params});
    
    const { data } = await api.post<CompanyResponseData>(`/companies`, {
        name: params.name,
        cnpj: params.cnpj,
        website: params.website,
        userId
    });
    return data;
}

async function getAllCompaniesByUserId(useId: string) {
    const { data } = await api.get<CompanyResponseData[]>(`/companies/user/${useId}`);
    return data;
}

async function getCompanyById(companyId: string) {
    const { data } = await api.get<CompanyData>(`/companies/${companyId}`);
    return data;
}

async function deleteCompanyById(companyId: string) {
    const { data } = await api.delete<CompanyData>(`/companies/${companyId}`);
    return data;
}

async function updateCompany(companyId: string, params: CompanyEditOrCreateData) {
    const { data } = await api.patch<CompanyData>(`/companies/${companyId}`, {
        name: params.name,
        cnpj: params.cnpj,
        website: params.website,
    });
    return data;
}

export {
    postCreateCompany,
    getAllCompaniesByUserId,
    getCompanyById,
    updateCompany,
    deleteCompanyById
};