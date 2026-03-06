'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

// Validation Schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional().refine(val => !val || /^[+]?[\d\s-]{7,20}$/.test(val), {
    message: 'Please enter a valid phone number',
  }),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Please provide more details (min 10 chars)'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: 'Brand Messaging & Strategy',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('sending')
    setErrorMessage(null)

    try {
      let token = ''
      if (executeRecaptcha) {
        token = await executeRecaptcha('contact')
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      })

      const result = await response.json()

      if (response.ok) {
        setFormStatus('success')
        reset()
      } else {
        setFormStatus('error')
        setErrorMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setFormStatus('error')
      setErrorMessage('A network error occurred. Please try again later.')
    }
  }

  if (formStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-brand-red)] text-white shadow-lg">
          <Icons.Check size={40} strokeWidth={2.5} />
        </div>
        <h3 className="font-display mb-4 text-3xl font-bold text-[var(--color-brand-dark)] uppercase tracking-tight">Message Sent!</h3>
        <p className="max-w-xs text-lg text-[var(--color-brand-charcoal)] opacity-80">
          Thanks for reaching out. I'll get back to you within 24–48 hours.
        </p>
        <button 
          onClick={() => setFormStatus('idle')}
          className="mt-10 group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-red)] hover:text-[var(--color-brand-red-dark)] transition-colors"
        >
          <span className="mr-2">Send Another</span>
          <Icons.RefreshCw size={14} className="transition-transform group-hover:rotate-180 duration-500" />
        </button>
      </div>
    )
  }

  const inputClasses = "w-full rounded-sm border-2 border-[var(--color-brand-charcoal)] bg-white px-5 py-4 text-sm font-medium transition-all focus:border-[var(--color-brand-red)] focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-red)]/10 placeholder:text-[var(--color-brand-muted)]/50"
  const labelClasses = "mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-red)]"
  const errorClasses = "mt-2 text-[10px] font-bold text-[var(--color-brand-red)] uppercase tracking-wide"

  return (
    <div className="space-y-6">
      {formStatus === 'error' && errorMessage && (
        <div className="flex items-center gap-3 rounded-sm border-2 border-[var(--color-brand-red)] bg-white p-4 text-xs font-bold text-[var(--color-brand-red)] uppercase tracking-wider">
          <Icons.AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="name" className={labelClasses}>
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className={`${inputClasses} ${errors.name ? 'border-[var(--color-brand-red)]' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="company" className={labelClasses}>
              Company Name (Optional)
            </label>
            <input
              {...register('company')}
              type="text"
              id="company"
              className={inputClasses}
              placeholder="Acme Corp"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`${inputClasses} ${errors.email ? 'border-[var(--color-brand-red)]' : ''}`}
              placeholder="hello@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className={labelClasses}>
              Phone Number (Optional)
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className={`${inputClasses} ${errors.phone ? 'border-[var(--color-brand-red)]' : ''}`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="subject" className={labelClasses}>
            I'm interested in
          </label>
          <div className="relative">
            <select
              {...register('subject')}
              id="subject"
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option>Brand Messaging & Strategy</option>
              <option>Website Copywriting</option>
              <option>Direct Response Email</option>
              <option>Content / Blog Strategy</option>
              <option>Other / Pure Collaboration</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[var(--color-brand-muted)]">
              <Icons.ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className={labelClasses}>
            Project Details
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className={`${inputClasses} ${errors.message ? 'border-[var(--color-brand-red)]' : ''}`}
            placeholder="What are we building?"
          />
          {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={formStatus === 'sending'}
          className="group relative w-full overflow-hidden rounded-sm bg-[var(--color-brand-dark)] py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-[var(--color-brand-red)] active:scale-[0.98] disabled:opacity-50 shadow-lg cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center">
            {formStatus === 'sending' ? (
              <>
                <Icons.Loader2 className="mr-3 animate-spin" size={16} />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Icons.ArrowRight size={14} className="ml-3 transition-transform group-hover:translate-x-2" />
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
