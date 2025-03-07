function DonationPage(){
    return (
        <stripe-buy-button
            buy-button-id="buy_btn_1R00DuFQjVpnMqYV59aAWdOh"
            publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
        >
        </stripe-buy-button>
    )
}

export default DonationPage