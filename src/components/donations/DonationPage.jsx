function DonationPage(){
    return (
        <stripe-buy-button
            buy-button-id={import.meta.env.VITE_STRIPE_DONATION_BUTTON_ID}
            publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
        >
        </stripe-buy-button>
    )
}

export default DonationPage