// Enums for AccountType and ServiceType
enum AccountType {
    OWNER = 'OWNER',
    PROVIDER = 'PROVIDER',
}

export enum ServiceType {
    CLEANING = 'CLEANING',
    LAWN_CARE = 'LAWN_CARE',
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
interface OwnerUser extends BaseUser {
    accountType: AccountType.OWNER;
    activeServices: string[];
    interestedIn: ServiceType[];
}

interface ProviderUser extends BaseUser {
    accountType: AccountType.PROVIDER;
    activeServices: string[]; // list of Service.id
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
            type: ServiceType.LAWN_CARE,
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