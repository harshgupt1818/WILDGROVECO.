import React, { useState } from 'react';
import { MapPin, Clock, Bike, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function DeliveryChecker({ deliveryZip, setDeliveryZip }) {
  const [inputZip, setInputZip] = useState(deliveryZip || '10012');
  const [status, setStatus] = useState({
    checked: true,
    available: true,
    hub: 'SoHo Micro-Kitchen (Spring & Mercer)',
    eta: '22–26 mins',
    couriers: 12
  });

  const activeZips = ['10001', '10002', '10003', '10004', '10011', '10012', '10013', '10014', '10016', '10017', '10018', '10019', '10022', '11201', '11211', '11249'];

  const checkPostal = (e) => {
    e.preventDefault();
    const clean = inputZip.trim();
    if (!clean) return;

    if (activeZips.includes(clean) || clean.startsWith('100') || clean.startsWith('112')) {
      setStatus({
        checked: true,
        available: true,
        hub: clean.startsWith('112') ? 'Williamsburg Hub (Berry St)' : 'SoHo Central Kitchen (Spring St)',
        eta: '22–28 mins',
        couriers: 14
      });
      setDeliveryZip(clean);
    } else {
      setStatus({
        checked: true,
        available: false,
        hub: null,
        eta: null,
        couriers: 0
      });
    }
  };

  return (
    <section id="delivery-section" className="py-20 bg-white border-b border-harvest-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-harvest-cream/70 rounded-3xl p-8 sm:p-12 border border-harvest-border/80 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Form */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-sprout border border-harvest-sageLight/70 text-harvest-forest text-xs font-bold uppercase tracking-wider mb-3">
                <Bike className="w-3.5 h-3.5 text-harvest-leaf" />
                <span>Zero-Emission Cargo Couriers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-harvest-dark tracking-tight">
                Check Instant Delivery to Your Door
              </h2>
              <p className="text-sm sm:text-base text-harvest-earth/70 mt-2 max-w-xl">
                We operate neighborhood micro-kitchens so your warm grains stay steaming and delicate greens never wilt on a long drive.
              </p>

              {/* Form Input */}
              <form onSubmit={checkPostal} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-harvest-sage absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputZip}
                    onChange={(e) => setInputZip(e.target.value)}
                    placeholder="Enter your Zip Code (e.g. 10012)"
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-harvest-border text-sm font-semibold text-harvest-dark focus:outline-none focus:ring-2 focus:ring-harvest-forest shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-harvest-forest hover:bg-harvest-forestHover text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Result Banner */}
              {status.checked && (
                <div className="mt-6">
                  {status.available ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-fadeIn">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-emerald-900">
                          ⚡ Active Direct Delivery Zone ({inputZip})!
                        </div>
                        <div className="text-xs text-emerald-800 mt-1">
                          Dispatched from <strong>{status.hub}</strong>. Estimated courier transit: <strong>{status.eta}</strong> via electric cargo bike.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 animate-fadeIn">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-amber-900">
                          Expanding to your neighborhood soon!
                        </div>
                        <div className="text-xs text-amber-800 mt-1">
                          We currently serve Manhattan below 96th St and North Brooklyn. Enter your email in our footer to get a free $10 voucher when we launch in {inputZip}.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Hubs Info */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-harvest-border shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-harvest-border/60 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest-sage">Active Kitchen Pods</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Open & Chopping Fresh
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  { name: 'SoHo & Downtown Kitchen', street: '142 Spring Street, NY', eta: '20-25 min', zip: '10012, 10013, 10014' },
                  { name: 'Flatiron & Chelsea Kitchen', street: '48 West 21st Street, NY', eta: '22-26 min', zip: '10010, 10011, 10001' },
                  { name: 'North Williamsburg Hub', street: '185 Berry Street, Brooklyn', eta: '24-28 min', zip: '11211, 11249, 11201' },
                  { name: 'Midtown East Kitchen', street: '580 Lexington Ave, NY', eta: '25-30 min', zip: '10022, 10017, 10019' },
                ].map((hub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-harvest-cream/40 border border-harvest-border/50 text-xs">
                    <div>
                      <div className="font-bold text-harvest-dark">{hub.name}</div>
                      <div className="text-harvest-sage text-[11px]">{hub.street}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-harvest-terracotta">{hub.eta}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
