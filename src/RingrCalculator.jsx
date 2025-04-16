import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";

function formatNumber(num) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(num);
}

function roundCalls(value) {
  if (value <= 10000) return Math.round(value / 1000) * 1000;
  return Math.round(value / 10000) * 10000;
}

export default function RingrCalculator() {
  const [calls, setCalls] = useState(1000);
  const [duration, setDuration] = useState(3);
  const [salary, setSalary] = useState(1260);
  const [concurrent, setConcurrent] = useState(1);
  const [userModifiedConcurrent, setUserModifiedConcurrent] = useState(false);

  const totalMinutes = calls * duration;
  let rate = 0.17;
  if (totalMinutes > 100000) {
    rate = 0.10;
  } else if (totalMinutes > 50000) {
    rate = 0.14;
  } else if (totalMinutes > 20000) {
    rate = 0.15;
  } else if (totalMinutes > 10000) {
    rate = 0.16;
  } else {
    rate = 0.17;
  }

  let ringrCost = Math.max(600, Math.round(totalMinutes * rate * 0.85));

  const baseMinutesPerDay = (8 * 60);
  const breakTime = 5 * 8;
  const realWorkingMinutesPerDay = baseMinutesPerDay - breakTime;
  const workingDays = 20;
  const vacationDays = 23;
  const totalWorkDays = 260 - vacationDays;
  const monthlyWorkDays = totalWorkDays / 12;

  const monthlyMinutesAvailable = realWorkingMinutesPerDay * monthlyWorkDays * 0.95;
  const callsPerEmployee = Math.floor(monthlyMinutesAvailable / duration);

  const hoursAvailable = 20 * 9;
  const callsPerHour = calls / hoursAvailable;
  const estimatedConcurrent = Math.ceil((callsPerHour * duration) / 60);

  useEffect(() => {
    if (!userModifiedConcurrent) {
      setConcurrent(estimatedConcurrent);
    }
  }, [calls, duration]);

  const employeesNeeded = Math.max(
    Math.ceil(calls / callsPerEmployee),
    concurrent
  );

  const socialCost = salary * 0.3;
  const vacationCost = salary * 0.088;
  const languageCost = salary * 0.05;
  const fixedPerEmployee = salary + socialCost + vacationCost + languageCost;

  const minutesPerEmployee = callsPerEmployee * duration;
  const telecomCostPerEmployee = minutesPerEmployee * 0.02;
  const totalPerEmployee = fixedPerEmployee + telecomCostPerEmployee;

  const employeeCost = employeesNeeded * totalPerEmployee;
  const monthlySavings = Math.max(0, employeeCost - ringrCost);
  const savingsPercent = employeeCost > 0 ? Math.round((monthlySavings / employeeCost) * 100) : 0;

  const sliderThumbClass = "[&>div>span]:bg-[#8857FC] [&>div>div]:bg-gradient-to-r [&>div>div]:from-[#44CCFF] [&>div>div]:to-[#8857FC]";

  return (
    <div className="p-6 max-w-md mx-auto bg-[#F8F9FA] rounded-2xl shadow grid gap-4">
      <h1 className="text-2xl font-bold text-[#1D1E2C] text-center leading-tight">Ahorro y alcance estimado</h1>
      <p className="text-xs text-gray-500 text-center mb-2">Calcula todo el potencial que Ringr podría ofrecerte.</p>

      <div className="grid gap-4 text-sm">
        <div className="grid gap-2">
          <Label className="text-[#1D1E2C] mb-1">Llamadas al mes</Label>
          <Slider className={sliderThumbClass} value={[calls]} min={100} max={100000} step={100} onValueChange={([v]) => setCalls(roundCalls(v))} />
          <div className="text-right text-base font-medium">{formatNumber(calls)}</div>
        </div>
        <div className="grid gap-2">
          <Label className="text-[#1D1E2C] mb-1">Duración media (min)</Label>
          <Slider className={sliderThumbClass} value={[duration]} min={1} max={30} step={1} onValueChange={([v]) => setDuration(v)} />
          <div className="text-right text-base font-medium">{duration}</div>
        </div>
        <div className="grid gap-2">
          <Label className="text-[#1D1E2C] mb-1">Llamadas concurrentes (estimadas: {estimatedConcurrent})</Label>
          <Slider className={sliderThumbClass} value={[concurrent]} min={1} max={50} step={1} onValueChange={([v]) => { setConcurrent(v); setUserModifiedConcurrent(true); }} />
          <div className="text-right text-base font-medium">{concurrent}</div>
        </div>
        <div className="grid gap-2">
          <Label className="text-[#1D1E2C] mb-1">Salario bruto mensual</Label>
          <Slider className={sliderThumbClass} value={[salary]} min={1260} max={3000} step={10} onValueChange={([v]) => setSalary(v)} />
          <div className="text-right text-base font-medium">{formatNumber(salary)} €</div>
        </div>
      </div>

      <Card className="bg-white border border-[#E0E0E0]">
        <CardContent className="p-5 grid grid-cols-2 gap-y-5 gap-x-4 text-sm text-center">
          <div>
            <p className="text-[#1D1E2C]">Coste empleados*</p>
            <p className="text-lg font-semibold text-[#1D1E2C]">{formatNumber(Math.floor(employeeCost))} €</p>
          </div>
          <div>
            <p className="text-[#1D1E2C]">Coste Ringr</p>
            <p className="text-lg font-semibold text-[#8857FC]">{formatNumber(Math.floor(ringrCost))} €</p>
          </div>
          <div>
            <p className="text-[#1D1E2C]">Nº Empleados</p>
            <p className="text-lg font-semibold">{formatNumber(Math.floor(employeesNeeded))} €</p>
          </div>
          <div>
            <p className="text-[#1D1E2C]">Ahorro</p>
            <p className="text-lg font-semibold text-green-600">{formatNumber(Math.floor(monthlySavings))} € ({savingsPercent}%)</p>
          </div>
          <div className="col-span-2">
            <Button className="w-full bg-[#8857FC] hover:bg-[#7740db] text-white text-sm px-4 py-2 rounded-xl">Solicitar demo</Button>
          </div>
          <p className="col-span-2 text-[10px] text-gray-400 mt-[-8px] leading-snug">*Incluye cotizaciones, telecomunicaciones, idiomas y vacaciones</p>
        </CardContent>
      </Card>
    </div>
  );
}
