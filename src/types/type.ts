interface Benefit {
    id: number,
    name: string;
}

interface Photo {
    id: number,
    photo: string,
}

interface Testimonial {
    id: number,
    name: string,
    message: string,
    photo: string,
    rating: string,
}

export interface Category {
    id: number,
    name: string,
    slug: string,
    photo: string,
    cosmetics_count: number,
    cosmetics: Cosmetic[],
    popular_cosmetics: Cosmetic[],
}

export interface Brand {
    id: number,
    name: string,
    slug: string,
    photo: string,
    cosmetics_count: number,
    cosmetics: Cosmetic[],
    popular_cosmetics: Cosmetic[],
}

export interface Cosmetic {
    id: number,
    name: string,
    slug: string,
    price: number
    is_popular: boolean,
    thumbnail: string,
    about: string,
    benefits: Benefit[],
    photos: Photo[],
    testimonials: Testimonial[],
    category: Category,
    brand: Brand,
}

export interface BookingDetails {
    id: number,
    name: string,
    phone: string,
    email: string,
    proof: string | null,
    address: string,
    post_code: string,
    city: string,
    trx_id: string,
    quantity: number,
    is_paid: boolean,
    sub_total_amount: number,
    total_tax_amount: number,
    total_amount: number,
    transaction_details: TransactionDetails[],
}

interface TransactionDetails {
    id: number,
    price: number,
    cosmetic_id: number,
    quantity: number,
    cosmetic: Cosmetic,
}

export interface CartItem {
    cosmetic_id: number,
    slug: string,
    quantity: number,
}

export type BookingFormData = {
    name: string,
    email: string,
    phone: string,
    address: string,
    post_code: string,
    city: string,
}