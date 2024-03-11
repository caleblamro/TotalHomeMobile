import { PostgrestError, Session } from "@supabase/supabase-js";
import { supabase } from "./supabase/supabase";

// Enums for AccountType and ServiceType
export enum AccountType {
    OWNER = 'OWNER',
    PROVIDER = 'PROVIDER',
}

export enum ServiceType {
    CLEANING = 'CLEANING',
    LANDSCAPING = 'LANDSCAPING',
    PEST_CONTROL = 'PEST_CONTROL',
    POOL_CARE = 'POOL_CARE',
}

export interface Service {
    id: string;
    name: string;
    description: string;
    recurring: boolean;
    recurringFrequency?: string; // Placeholder, as you're unsure how to handle this yet
    needQuote: boolean;
    price: number;
    rating: number;
    type: ServiceType;
    providedBy: string;
    negotiable: boolean;
}

// Base User interface
interface BaseUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    accountType: AccountType;
}

// Extended interfaces for OWNER and PROVIDER types
export interface OwnerUser extends BaseUser {
    accountType: AccountType.OWNER;
    interestedIn: ServiceType[];
}

export interface ProviderUser extends BaseUser {
    accountType: AccountType.PROVIDER;
    activeServices: string[]; // list of Service.id
}
export async function getCurrentUserInformation(session: any): Promise<OwnerUser | ProviderUser | null> {
    if (!session) {
        console.log("Auth Error: Session not defined... cannot proceed with request");
        return null;
    }
    const { data: accountData, error: accountDataError } = await supabase
        .from("user_info")
        .select("*")
        .eq("id", session?.user?.id);
    if (accountDataError || !accountData || accountData.length !== 1) {
        console.log("API Error: in getUserInformation");
        return null;
    }
    const { username, type } = accountData[0];
    if (username) {
        if (type === "OWNER") {
            return await getOwnerInformation(username, session);
        } else {
            return await getProviderInformation(username, session);
        }
    }
    return null;
}

async function getOwnerInformation(username: string, session: Session): Promise<OwnerUser | null> {
    if (!session?.user.id) {
        console.log("Auth Error: Session not defined... cannot proceed with request");
        return null;
    }
    const { data: userData, error: userDataError } = await supabase
        .from("owner_info")
        .select("*")
        .eq("id", session?.user?.id);
    if (userDataError || !userData || userData.length !== 1) {
        console.log("API Error: in getOwnerInformation");
        return null;
    }
    const res = userData[0];
    const interestedServices: ServiceType[] = res.interested_in ? res.interested_in.map((val) => ServiceType[val]) : [];
    const tempUserInfo: OwnerUser = {
        accountType: AccountType.OWNER,
        interestedIn: interestedServices,
        id: res.id,
        firstName: res.first_name || "",
        lastName: res.last_name || "",
        username: username
    }
    return tempUserInfo;
}

async function getProviderInformation(username: string, session: Session): Promise<ProviderUser | null> {
    if (!session?.user.id) {
        console.log("Auth Error: Session not defined... cannot proceed with request");
        return null;
    }
    const { data: userData, error: userDataError } = await supabase
        .from("servicer_info")
        .select("*")
        .eq("id", session?.user?.id);
    if (userDataError || !userData || userData.length !== 1) {
        console.log("API Error: in getProviderInformation");
        return null;
    }
    const res = userData[0];
    const tempUserInfo: ProviderUser = {
        accountType: AccountType.PROVIDER,
        id: res.id,
        activeServices: [], // Assuming services is an array of service IDs
        firstName: "",
        lastName: "",
        username: username
    }
    return tempUserInfo;
}

export const fetchUsers = (): Promise<Array<OwnerUser | ProviderUser>> => {
    return Promise.resolve([
        {
            id: 'user-1',
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'janedoe',
            accountType: AccountType.OWNER,
            interestedIn: [ServiceType.CLEANING, ServiceType.PEST_CONTROL],
        } as OwnerUser, // Cast to specific user type
        {
            id: 'user-2',
            firstName: 'John',
            lastName: 'Smith',
            username: 'johnsmith',
            accountType: AccountType.PROVIDER,
            activeServices: ['service-1', 'service-2'],
        } as ProviderUser, // Cast to specific user type
    ]);
};

export const fetchServices = (): Promise<Service[]> => {
    return Promise.resolve([
        {
            id: 'service-1',
            name: 'Home Cleaning',
            description: 'Comprehensive cleaning services for your home.',
            recurring: true,
            recurringFrequency: "1 / Mo", // To be determined
            type: ServiceType.CLEANING,
            needQuote: false,
            rating: 4,
            price: 100.00,
            providedBy: 'CrystalCleanAZ',
            negotiable: true,
        },
        {
            id: 'service-2',
            name: 'Total Lawn Care',
            description: 'Full custom lawn care service, contact us for a quote!',
            recurring: true,
            recurringFrequency: "1 / Mo",
            needQuote: true,
            type: ServiceType.LANDSCAPING,
            rating: 3,
            price: 0, // Price needs a quote
            providedBy: 'AZLandScapers',
            negotiable: false,
        },
        {
            id: 'service-3',
            name: 'Pest Control',
            description: 'Spray for all different types of bugs found in AZ!',
            recurring: true,
            recurringFrequency: "3 / Yr",
            needQuote: false,
            type: ServiceType.PEST_CONTROL,
            rating: 4,
            price: 249.99, // Price needs a quote
            providedBy: 'BugCrushers',
            negotiable: true,
        },
        {
            id: 'service-4',
            name: 'Pool Management',
            description: 'Keep your pool healthy and looking great during all seasons.',
            recurring: true,
            recurringFrequency: "1 / Mo",
            needQuote: false,
            type: ServiceType.POOL_CARE,
            rating: 4,
            price: 39.99, // Price needs a quote
            providedBy: 'PoolDoctors',
            negotiable: false,
        },
    ]);
};