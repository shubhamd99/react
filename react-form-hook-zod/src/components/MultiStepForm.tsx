import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { SubmitHandler, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormValues, TIER_OPTIONS } from '../schema/registrationSchema';
import { Input, Button, Label } from './ui/FormPrimitives';
import { Select } from './ui/Select';
import { CheckCircle2 } from 'lucide-react';

const steps = ['Personal Info', 'Address', 'Skills & Tier'];

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched', // Validate on blur for better UX in multi-step
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 0,
      tier: 'Free',
      address: {
        street: '',
        city: '',
        zipCode: '',
      },
      skills: [{ name: '', experience: 0 }],
        termsAccepted: false,
    },
  });

  const { handleSubmit, trigger, register, formState: { errors, isSubmitting }, reset } = methods;

  const nextStep = async () => {
    let fieldsToValidate: FieldPath<RegistrationFormValues>[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ['username', 'email', 'password', 'confirmPassword', 'age'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['address.street', 'address.city', 'address.zipCode'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev: number) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 0));
  };

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Multi-Step Form Submitted Successfully', data);
    alert('Registration Complete!');
    reset();
    setCurrentStep(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200 mt-10 mb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center">Multi-Step Onboarding</h2>
        
        {/* Progress Bar */}
        <div className="mt-8 flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded transition-all duration-300" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
          />
          {steps.map((step, idx) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${idx <= currentStep ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <span className={`absolute -bottom-6 text-xs whitespace-nowrap font-medium ${idx <= currentStep ? 'text-slate-800' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <span className="text-sm font-semibold text-blue-600">
            <span>{steps[currentStep]}</span>
          </span>
          <span className="ml-2 text-sm text-slate-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ms-username">Username *</Label>
                  <Input
                    id="ms-username"
                    {...register('username')}
                    error={errors.username?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="ms-email">Email *</Label>
                  <Input
                    id="ms-email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ms-password">Password *</Label>
                  <Input
                    id="ms-password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="ms-confirmPassword">Confirm Password *</Label>
                  <Input
                    id="ms-confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="ms-age">Age *</Label>
                <Input
                  id="ms-age"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  error={errors.age?.message}
                />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <Label htmlFor="ms-street">Street *</Label>
                <Input
                  id="ms-street"
                  {...register('address.street')}
                  error={errors.address?.street?.message}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ms-city">City *</Label>
                  <Input
                    id="ms-city"
                    {...register('address.city')}
                    error={errors.address?.city?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="ms-zipCode">Zip Code *</Label>
                  <Input
                    id="ms-zipCode"
                    {...register('address.zipCode')}
                    error={errors.address?.zipCode?.message}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Tier */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <Label htmlFor="ms-tier">Subscription Tier *</Label>
                <Select
                  id="ms-tier"
                  {...register('tier')}
                  options={TIER_OPTIONS.map((t) => ({ label: t, value: t }))}
                  error={errors.tier?.message}
                />
              </div>

              <div className="pt-4 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="ms-termsAccepted"
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    {...register('termsAccepted')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="ms-termsAccepted" className="font-medium text-slate-700">
                    I accept the Terms and Conditions
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-6 border-t border-slate-100 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-24 border-slate-200"
            >
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep} className="w-24">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-32 bg-green-600 hover:bg-green-700"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
