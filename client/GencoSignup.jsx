import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function GencoSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    trashDays: [],
    bins: 1,
    addons: [],
  });

  const trashOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const addonOptions = ['Recycling Pickup', 'Bin Cleaning'];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const submitForm = async () => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('There was an error processing your signup.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <Label>Name</Label>
              <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
              <Label>Email</Label>
              <Input value={form.email} onChange={e => handleChange('email', e.target.value)} />
              <Label>Phone</Label>
              <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
              <Label>Address</Label>
              <Input value={form.address} onChange={e => handleChange('address', e.target.value)} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <Label>Select Trash Days</Label>
              {trashOptions.map(day => (
                <div key={day} className="flex items-center">
                  <Checkbox
                    checked={form.trashDays.includes(day)}
                    onCheckedChange={() => toggleArrayField('trashDays', day)}
                  />
                  <span className="ml-2">{day}</span>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>How many bins?</Label>
              <Input
                type="number"
                value={form.bins}
                onChange={e => handleChange('bins', parseInt(e.target.value))}
              />
              <Label>Add-ons</Label>
              {addonOptions.map(addon => (
                <div key={addon} className="flex items-center">
                  <Checkbox
                    checked={form.addons.includes(addon)}
                    onCheckedChange={() => toggleArrayField('addons', addon)}
                  />
                  <span className="ml-2">{addon}</span>
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <p className="mb-4">Review and Confirm</p>
              <pre className="text-left bg-gray-100 p-4 rounded text-sm">{JSON.stringify(form, null, 2)}</pre>
              <Button className="mt-4" onClick={submitForm}>Submit & Checkout</Button>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && <Button variant="outline" onClick={handlePrev}>Back</Button>}
            {step < 4 && <Button onClick={handleNext}>Next</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
