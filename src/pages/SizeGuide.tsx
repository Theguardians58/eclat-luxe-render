import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Ruler, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Measurements {
  bust: string;
  waist: string;
  hips: string;
}

interface SizeResult {
  size: string;
  fit: 'perfect' | 'tight' | 'loose';
}

const sizeChart = [
  { size: 'XS', bust: '81-84', waist: '61-64', hips: '86-89' },
  { size: 'S', bust: '86-89', waist: '66-69', hips: '91-94' },
  { size: 'M', bust: '91-94', waist: '71-74', hips: '96-99' },
  { size: 'L', bust: '96-99', waist: '76-79', hips: '101-104' },
  { size: 'XL', bust: '101-104', waist: '81-84', hips: '106-109' },
  { size: 'XXL', bust: '106-109', waist: '86-89', hips: '111-114' },
];

export default function SizeGuide() {
  const [measurements, setMeasurements] = useState<Measurements>({
    bust: '',
    waist: '',
    hips: '',
  });
  const [result, setResult] = useState<SizeResult | null>(null);

  const calculateSize = () => {
    const bust = parseFloat(measurements.bust);
    const waist = parseFloat(measurements.waist);
    const hips = parseFloat(measurements.hips);

    if (isNaN(bust) || isNaN(waist) || isNaN(hips)) {
      return;
    }

    // Find matching size based on measurements
    for (const size of sizeChart) {
      const [bustMin, bustMax] = size.bust.split('-').map(Number);
      const [waistMin, waistMax] = size.waist.split('-').map(Number);
      const [hipsMin, hipsMax] = size.hips.split('-').map(Number);

      if (
        bust >= bustMin && bust <= bustMax &&
        waist >= waistMin && waist <= waistMax &&
        hips >= hipsMin && hips <= hipsMax
      ) {
        setResult({ size: size.size, fit: 'perfect' });
        return;
      }
    }

    // If no perfect match, find closest size
    let closestSize = sizeChart[0];
    let minDiff = Infinity;

    sizeChart.forEach((size) => {
      const [bustMin, bustMax] = size.bust.split('-').map(Number);
      const bustAvg = (bustMin + bustMax) / 2;
      const diff = Math.abs(bust - bustAvg);

      if (diff < minDiff) {
        minDiff = diff;
        closestSize = size;
      }
    });

    const [bustMin, bustMax] = closestSize.bust.split('-').map(Number);
    const fit = bust < bustMin ? 'loose' : bust > bustMax ? 'tight' : 'perfect';
    setResult({ size: closestSize.size, fit });
  };

  const handleInputChange = (field: keyof Measurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif text-foreground">Size Guide & Calculator</h1>
          <p className="text-muted-foreground">Find your perfect fit with our measurement guide</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Size Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Size Calculator
              </CardTitle>
              <CardDescription>
                Enter your measurements in centimeters to find your recommended size
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bust">Bust (cm)</Label>
                  <Input
                    id="bust"
                    type="number"
                    placeholder="e.g., 86"
                    value={measurements.bust}
                    onChange={(e) => handleInputChange('bust', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder="e.g., 66"
                    value={measurements.waist}
                    onChange={(e) => handleInputChange('waist', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hips">Hips (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    placeholder="e.g., 91"
                    value={measurements.hips}
                    onChange={(e) => handleInputChange('hips', e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateSize} className="w-full">
                Calculate My Size
              </Button>

              {result && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold text-lg mb-1">
                      Recommended Size: {result.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {result.fit === 'perfect' && 'This size should fit you perfectly!'}
                      {result.fit === 'tight' && 'This size might be slightly fitted. Consider sizing up for a looser fit.'}
                      {result.fit === 'loose' && 'This size might be slightly loose. Consider sizing down for a tighter fit.'}
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Measurement Guide */}
          <Card>
            <CardHeader>
              <CardTitle>How to Measure</CardTitle>
              <CardDescription>
                Follow these steps for accurate measurements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-foreground">Bust</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your bust, keeping the tape horizontal and relaxed.
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-foreground">Waist</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around your natural waistline, which is typically the narrowest part of your torso.
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-foreground">Hips</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure around the fullest part of your hips, keeping the tape horizontal.
                  </p>
                </div>
              </div>

              <Alert className="bg-muted border-muted-foreground/20">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Pro tip:</strong> For best results, wear form-fitting clothing and measure over your undergarments. Keep the tape snug but not tight.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Size Chart Table */}
        <Card>
          <CardHeader>
            <CardTitle>Size Chart</CardTitle>
            <CardDescription>
              All measurements in centimeters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Size</TableHead>
                  <TableHead className="font-semibold">Bust (cm)</TableHead>
                  <TableHead className="font-semibold">Waist (cm)</TableHead>
                  <TableHead className="font-semibold">Hips (cm)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeChart.map((size) => (
                  <TableRow key={size.size}>
                    <TableCell className="font-medium">{size.size}</TableCell>
                    <TableCell>{size.bust}</TableCell>
                    <TableCell>{size.waist}</TableCell>
                    <TableCell>{size.hips}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
