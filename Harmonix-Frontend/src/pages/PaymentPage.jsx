"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Separator } from "../components/ui/separator"
import { MainLayout } from "../components/main-layout"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [selectedPlan, setSelectedPlan] = useState("premium-individual")

  const plans = {
    "premium-individual": {
      name: "Premium Individual",
      price: "$9.99/month",
      features: ["Ad-free music listening", "Play anywhere - even offline", "On-demand playback"],
    },
    "premium-duo": {
      name: "Premium Duo",
      price: "$12.99/month",
      features: ["2 Premium accounts", "Ad-free music listening", "Play anywhere - even offline", "On-demand playback"],
    },
    "premium-family": {
      name: "Premium Family",
      price: "$15.99/month",
      features: [
        "6 Premium accounts",
        "Block explicit music",
        "Ad-free music listening",
        "Play anywhere - even offline",
        "On-demand playback",
      ],
    },
  }

  const selectedPlanDetails = plans[selectedPlan]

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/premium-plans">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40 hover:bg-black/60">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="bg-zinc-900/60 rounded-lg p-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Credit or Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.404 2.94l-1.12 7.106c-.86.541.326 1.04.88 1.04h4.607a.712.712 0 0 0 .702-.58l.785-4.979.05-.321a.712.712 0 0 1 .7-.58h1.441c4.113 0 7.143-2.072 8.063-6.549.4-1.944.196-3.548-.908-4.872z" />
                      </svg>
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </section>

            {paymentMethod === "credit-card" && (
              <section>
                <h2 className="text-xl font-bold mb-4">Card Details</h2>
                <div className="bg-zinc-900/60 rounded-lg p-4 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="bg-zinc-800 border-zinc-700" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
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
                        <Select>
                          <SelectTrigger className="bg-zinc-800 border-zinc-700">
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
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="bg-zinc-800 border-zinc-700" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="J. Smith" className="bg-zinc-800 border-zinc-700" />
                  </div>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold mb-4">Billing Address</h2>
              <div className="bg-zinc-900/60 rounded-lg p-4 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" className="bg-zinc-800 border-zinc-700" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" className="bg-zinc-800 border-zinc-700" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" className="bg-zinc-800 border-zinc-700" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="bg-zinc-900/60 rounded-lg p-4 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedPlanDetails.name}</h3>
                  <p className="text-lg font-bold">{selectedPlanDetails.price}</p>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="space-y-2">
                  <h3 className="font-medium">What's included:</h3>
                  <ul className="space-y-2">
                    {selectedPlanDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{selectedPlanDetails.price}</span>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Complete Payment</Button>

                  <div className="flex items-center justify-center gap-1 mt-4 text-xs text-zinc-400">
                    <Lock className="h-3 w-3" />
                    <span>Secure payment processed by Stripe</span>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 text-center">
                  By completing your purchase you agree to our
                  <Link to="#" className="text-white hover:underline ml-1">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

