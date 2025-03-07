function DonationPage(){
    return (<>
        <stripe-buy-button
            buy-button-id={import.meta.env.VITE_STRIPE_DONATION_BUTTON_ID}
            publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
        >
        </stripe-buy-button>
        <h2>WARNING!</h2>
        <p>As part of the process, Stripe does require that you enter your postcode, and for some reason, I do have access to this in the Stripe dashboard. I understand if this makes you uncomfortable, and I am trying to find a way to make sure that this is hidden from my view.</p>
        <p>That said, in the meantime, I promise I will not do anything with your address other than what is necessary (although in this case, I don't even think collecting it is necessary...), so if you still want to donate despite this warning, go ahead. I would appreciate it. However, if it makes you uncomfortable, you absolutely do not <em>have</em> to make a donation - the site as a whole is still free to use.</p>
    </>)
}

export default DonationPage