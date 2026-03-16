import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormValues, TIER_OPTIONS } from '../schema/registrationSchema';
import { Input, Button, Label } from './ui/FormPrimitives';
import { Select } from './ui/Select';
import { Plus, Trash2 } from 'lucide-react';

export default function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange', // validate as we type
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    // mock api call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form Submitted Successfully', data);
    alert('Registration Successful!');
    reset(); // reset form to default values after success
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200 mt-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-slate-500 mt-2">Join us and experience the premium platform.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Details Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username" className="mb-1 block">Username *</Label>
              <Input
                id="username"
                placeholder="johndoe"
                {...register('username')}
                error={errors.username?.message}
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1 block">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="mb-1 block">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="mb-1 block">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age" className="mb-1 block">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                {...register('age', { valueAsNumber: true })}
                error={errors.age?.message}
              />
            </div>
            
            {/* Controlled Input Example */}
            <div>
              <Label htmlFor="tier" className="mb-1 block">Subscription Tier *</Label>
              <Controller
                name="tier"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="tier"
                    options={TIER_OPTIONS.map((t) => ({ label: t, value: t }))}
                    error={errors.tier?.message}
                  />
                )}
              />
            </div>
          </div>
        </section>

        {/* Nested Object (Address) Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="street" className="mb-1 block">Street *</Label>
              <Input
                id="street"
                placeholder="123 Main St"
                {...register('address.street')}
                error={errors.address?.street?.message}
              />
            </div>
            <div>
              <Label htmlFor="city" className="mb-1 block">City *</Label>
              <Input
                id="city"
                placeholder="New York"
                {...register('address.city')}
                error={errors.address?.city?.message}
              />
            </div>
            <div>
              <Label htmlFor="zipCode" className="mb-1 block">Zip Code *</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                {...register('address.zipCode')}
                error={errors.address?.zipCode?.message}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Fields Array Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold text-slate-800">Skills</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: '', experience: 0 })}
              className="h-8"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Skill
            </Button>
          </div>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex-1 w-full">
                  <Label className="mb-1 block text-xs">Skill Name</Label>
                  <Input
                    placeholder="e.g. React"
                    {...register(`skills.${index}.name`)}
                    error={errors.skills?.[index]?.name?.message}
                  />
                </div>
                <div className="flex-1 w-full sm:w-32 sm:flex-none">
                  <Label className="mb-1 block text-xs">Years Exp</Label>
                  <Input
                    type="number"
                    placeholder="2"
                    {...register(`skills.${index}.experience`, { valueAsNumber: true })}
                    error={errors.skills?.[index]?.experience?.message}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-10 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.skills?.root && (
              <p className="text-sm text-red-500">{errors.skills.root.message}</p>
            )}
          </div>
        </section>

        {/* Terms and Submit */}
        <section className="pt-4 space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAccepted"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                {...register('termsAccepted')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="termsAccepted" className="font-medium text-slate-700">
                I accept the Terms and Conditions
              </label>
              {errors.termsAccepted && (
                <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isDirty || isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </section>
      </form>
    </div>
  );
}
