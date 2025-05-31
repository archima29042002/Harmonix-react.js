"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, CreditCard, Lock, CheckCircle2, Apple } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Separator } from "../components/ui/separator"
import { Checkbox } from "../components/ui/checkbox"
import { MainLayout } from "../components/main-layout"

// Custom PayPal icon since it's not in Lucide
function PaypalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.404 2.94l-1.12 7.106c-.86.541.326 1.04.88 1.04h4.607a.712.712 0 0 0 .702-.58l.785-4.979.05-.321a.712.712 0 0 1 .7-.58h1.441c4.113 0 7.143-2.072 8.063-6.549.4-1.944.196-3.548-.908-4.872z" />
    </svg>
  )
}

// Plans data
const plans = {
  "premium-individual": {
    name: "Premium Individual",
    price: "₹9.99/month",
    priceValue: 9.99,
    cycle: "monthly",
    features: ["Ad-free music listening", "Play anywhere - even offline", "On-demand playback"],
  },
  "premium-duo": {
    name: "Premium Duo",
    price: "₹12.99/month",
    priceValue: 12.99,
    cycle: "monthly",
    features: ["2 Premium accounts", "Ad-free music listening", "Play anywhere - even offline", "On-demand playback"],
  },
  "premium-family": {
    name: "Premium Family",
    price: "₹15.99/month",
    priceValue: 15.99,
    cycle: "monthly",
    features: [
      "6 Premium accounts",
      "Block explicit music",
      "Ad-free music listening",
      "Play anywhere - even offline",
      "On-demand playback",
    ],
  },
  "premium-individual-yearly": {
    name: "Premium Individual (Yearly)",
    price: "₹95.88/year",
    priceValue: 95.88,
    cycle: "yearly",
    features: ["Ad-free music listening", "Play anywhere - even offline", "On-demand playback", "Save ₹23.88 per year"],
  },
  "premium-duo-yearly": {
    name: "Premium Duo (Yearly)",
    price: "₹124.99/year",
    priceValue: 124.99,
    cycle: "yearly",
    features: [
      "2 Premium accounts",
      "Ad-free music listening",
      "Play anywhere - even offline",
      "On-demand playback",
      "Save ₹30.89 per year",
    ],
  },
  "premium-family-yearly": {
    name: "Premium Family (Yearly)",
    price: "₹153.99/year",
    priceValue: 153.99,
    cycle: "yearly",
    features: [
      "6 Premium accounts",
      "Block explicit music",
      "Ad-free music listening",
      "Play anywhere - even offline",
      "On-demand playback",
      "Save ₹37.89 per year",
    ],
  },
}

export default function PaymentGatewayPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const planId = searchParams.get("plan") || "premium-individual"

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expMonth, setExpMonth] = useState("")
  const [expYear, setExpYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const selectedPlan = plans[planId] || plans["premium-individual"]

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const validateForm = () => {
    const errors = {}

    if (paymentMethod === "credit-card") {
      if (!cardNumber) errors.cardNumber = "Card number is required"
      if (!cardName) errors.cardName = "Name on card is required"
      if (!expMonth) errors.expMonth = "Expiry month is required"
      if (!expYear) errors.expYear = "Expiry year is required"
      if (!cvc) errors.cvc = "CVC is required"
    }

    if (!agreeTerms) errors.agreeTerms = "You must agree to the terms and conditions"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      navigate(`/payment-complete?plan=${planId}`)
    }, 2000)
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 bg-background min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-secondary/20 hover:bg-secondary/30"
            onClick={() => navigate(`/premium-plans`)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-8">
          <motion.div variants={item} className="md:col-span-2 space-y-8">
            <form onSubmit={handleSubmit}>
              <section className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card"/>
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      Credit or Debit Card
                    </Label>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                      <PaypalIcon className="text-[#00457C]" />
                      PayPal
                    </Label>
                  </div> */}
                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apple-pay" id="apple-pay" />
                    <Label htmlFor="apple-pay" className="flex items-center gap-2 cursor-pointer">
                      <Apple className="h-5 w-5" />
                      Apple Pay
                    </Label>
                  </div> */}
                </RadioGroup>
              </section>

              {paymentMethod === "credit-card" && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border"
                >
                  <h2 className="text-xl font-bold mb-4">Card Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="mb-1 block">
                        Card Number
                      </Label>
                      <Input
                        id="card-number"
                        // placeholder="1234 5678 9012 3456"
                        className="pl-5 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                      {formErrors.cardNumber && (
                        <p className="text-destructive text-sm mt-1">{formErrors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="card-name" className="mb-1 block">
                        Name on Card
                      </Label>
                      <Input
                        id="card-name"
                        // placeholder="John Smith"
                        className="pl-3 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      {formErrors.cardName && <p className="text-destructive text-sm mt-1">{formErrors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Label htmlFor="exp-month" className="mb-1 block">
                          Month
                        </Label>
                        <Select value={expMonth} onValueChange={setExpMonth}>
                          <SelectTrigger id="exp-month" className="pl-3 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.expMonth && <p className="text-destructive text-sm mt-1">{formErrors.expMonth}</p>}
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="exp-year" className="mb-1 block">
                          Year
                        </Label>
                        <Select value={expYear} onValueChange={setExpYear}>
                          <SelectTrigger id="exp-year" className="pl-3 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                              <SelectItem key={year} value={year.toString().slice(-2)}>
                                {year.toString().slice(-2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.expYear && <p className="text-destructive text-sm mt-1">{formErrors.expYear}</p>}
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="cvv" className="mb-1 block">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          // placeholder="123"
                          className="pl-3 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-600 focus:border-purple-600 focus:ring-purple-600 focus-visible:ring-purple-600 focus-visible:border-purple-600 h-8 text-base text-black dark:text-white"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                        />
                        {formErrors.cvc && <p className="text-destructive text-sm mt-1">{formErrors.cvc}</p>}
                      </div>
                    </div>
                    

                    {/* <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="save-card" checked={saveCard} onCheckedChange={setSaveCard} />
                      <Label htmlFor="save-card" className="text-sm text-muted-foreground cursor-pointer">
                        Save this card for future payments
                      </Label>
                    </div> */}
                  </div>
                </motion.section>
              )}

              {paymentMethod === "paypal" && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border text-center"
                >
                  <PaypalIcon className="h-12 w-12 text-[#00457C] mx-auto mb-4" />
                  <p className="mb-4">You will be redirected to PayPal to complete your purchase.</p>
                  <p className="text-sm text-muted-foreground">
                    Please note: You don't need a PayPal account to pay with your credit card through PayPal.
                  </p>
                </motion.section>
              )}

              {paymentMethod === "apple-pay" && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border text-center"
                >
                  <Apple className="h-12 w-12 mx-auto mb-4" />
                  <p className="mb-4">You will be prompted to complete your purchase with Apple Pay.</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure you're using a compatible device with Apple Pay set up.
                  </p>
                </motion.section>
              )}

              {/* <section className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-4">Billing Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name" className="mb-1 block">
                        First Name
                      </Label>
                      <Input id="first-name" placeholder="John" className="bg-background border-input" />
                    </div>
                    <div>
                      <Label htmlFor="last-name" className="mb-1 block">
                        Last Name
                      </Label>
                      <Input id="last-name" placeholder="Smith" className="bg-background border-input" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="mb-1 block">
                      Address
                    </Label>
                    <Input id="address" placeholder="123 Main St" className="bg-background border-input" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="mb-1 block">
                        City
                      </Label>
                      <Input id="city" placeholder="New York" className="bg-background border-input" />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="mb-1 block">
                        ZIP Code
                      </Label>
                      <Input id="zip" placeholder="10001" className="bg-background border-input" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country" className="mb-1 block">
                      Country
                    </Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="country" className="bg-background border-input">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section> */}

              <section className="bg-card rounded-lg p-6 mb-6 shadow-sm border border-border">
                <div className="flex items-center space-x-2 mb-6">
                  {/* <Checkbox id="agree-terms" checked={agreeTerms} onCheckedChange={setAgreeTerms} />
                  <Label htmlFor="agree-terms" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the{" "} */}
                    {/* <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a> */}
                  {/* </Label> */}
                </div>
                {/* {formErrors.agreeTerms && <p className="text-destructive text-sm">{formErrors.agreeTerms}</p>} */}

                <Button
                  type="submit"
                  className="w-full bg-purple-500 text-primary-foreground font-bold h-12"
                  disabled={isSubmitting}
                >
                  
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${selectedPlan.price.split("/")[0].replace("₹", "")}`
                  )}
                </Button>

                <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secure payment processed</span>
                </div>
              </section>
            </form>
          </motion.div>

          <motion.div variants={item} className="md:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-6 shadow-sm border border-border">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedPlan.name}</h3>
                  <p className="text-lg font-bold">{selectedPlan.price}</p>
                </div>

                <Separator className="bg-border" />

                <div className="space-y-2">
                  <h3 className="font-medium">What's included:</h3>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <motion.li key={index} className="flex items-start gap-2" whileHover={{ x: 5 }}>
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-border" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{selectedPlan.price.split("/")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{selectedPlan.price.split("/")[0]}</span>
                </div>

                <div className="pt-4 text-sm text-muted-foreground">
                  <p>
                    {selectedPlan.cycle === "monthly"
                      ? "You'll be charged monthly until you cancel."
                      : "You'll be charged annually until you cancel."}
                  </p>
                  <p className="mt-2">
                    Cancel anytime.{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms apply
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  )
}

