import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Type, Layout, Sliders, Box, Code, Copy, Check, X, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { UIComponentSpec } from '../types';

interface DesignSystemSpecProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignSystemSpec({ isOpen, onClose }: DesignSystemSpecProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'components' | 'animations'>('colors');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const colors = [
    { name: 'Primary (Dark Navy)', hex: '#1a365d', desc: 'Dominates headers, buttons, footers, & overlays. Evokes a celestial night.', tailwind: 'bg-primary' },
    { name: 'Secondary (Warm Gold)', hex: '#d4a574', desc: 'Highlights badges, accents, border outlines, and buttons. Simulates string lights.', tailwind: 'bg-secondary' },
    { name: 'Background (Cream)', hex: '#faf9f6', desc: 'Warm cream base for body backdrop. Cozy, inviting, safe look.', tailwind: 'bg-cream' },
    { name: 'Accent (Green)', hex: '#38a169', desc: 'Used for success states and primary Reserve CTA button. Echoes the garden.', tailwind: 'bg-accent-green' },
    { name: 'Text (Dark Gray)', hex: '#2d3748', desc: 'Main content font fill. Highly legible with optimal contrast ratios.', tailwind: 'bg-darkgray' },
  ];

  type TextToken = {
    tag: string;
    description: string;
    fontFamily: string;
    fontSizeDesktop: string;
    fontSizeMobile: string;
    lineHeight: string;
    tracking: string;
    cssClass: string;
  };

  const typography: TextToken[] = [
    { tag: 'Hero Title', description: 'Large centered branding title with severe gold accent', fontFamily: 'Playfair Display (Serif)', fontSizeDesktop: '5rem (80px)', fontSizeMobile: '2.5rem (40px)', lineHeight: '1.1', tracking: 'tracking-tight', cssClass: 'font-serif text-5xl md:text-8xl' },
    { tag: 'H1 Headings', description: 'Section headers indicating menu or reservation sections', fontFamily: 'Playfair Display (Serif)', fontSizeDesktop: '2.5rem (40px)', fontSizeMobile: '1.875rem (30px)', lineHeight: '1.2', tracking: 'tracking-tight', cssClass: 'font-serif text-3xl md:text-5xl' },
    { tag: 'H2 Headings', description: 'Subsections and category tabs titles', fontFamily: 'Inter (Sans-serif)', fontSizeDesktop: '1.5rem (24px)', fontSizeMobile: '1.25rem (20px)', lineHeight: '1.3', tracking: 'tracking-wide font-medium', cssClass: 'font-sans text-xl md:text-2xl font-medium' },
    { tag: 'Body Lead', description: 'Lead paragraphs, taglines, hero summaries', fontFamily: 'Inter (Sans-serif)', fontSizeDesktop: '1.125rem (18px)', fontSizeMobile: '1rem (16px)', lineHeight: '1.6', tracking: 'tracking-normal font-light', cssClass: 'font-sans text-base md:text-lg font-light' },
    { tag: 'Body Normal', description: 'General paragraphs and descriptions', fontFamily: 'Inter (Sans-serif)', fontSizeDesktop: '0.975rem (15px)', fontSizeMobile: '0.875rem (14px)', lineHeight: '1.6', tracking: 'tracking-normal', cssClass: 'font-sans text-sm md:text-[15px]' },
    { tag: 'Monospace Tokens', description: 'Prices, tables, counts, coordinates, specs', fontFamily: 'JetBrains Mono (Mono)', fontSizeDesktop: '0.875rem (14px)', fontSizeMobile: '0.75rem (12px)', lineHeight: '1.4', tracking: 'tracking-normal', cssClass: 'font-mono text-xs md:text-sm' },
  ];

  const componentsSpecs: UIComponentSpec[] = [
    { name: 'Primary Button', padding: 'px-8 py-3.5', margin: 'mx-0', fontSize: 'text-base font-semibold uppercase tracking-wider', shadow: 'shadow-md hover:shadow-gold', duration: 'transition-all duration-300', hoverState: 'hover:scale-[1.02] hover:bg-secondary/10 hover:text-secondary' },
    { name: 'Reserve CTA Button', padding: 'px-8 py-4', margin: 'my-2', fontSize: 'text-lg font-bold tracking-wider uppercase', shadow: 'shadow-lg hover:shadow-emerald/30', duration: 'transition-all duration-300', hoverState: 'hover:scale-[1.03] hover:bg-emerald-600' },
    { name: 'Category Tab (Active)', padding: 'px-5 py-2.5', margin: 'mx-1 md:mx-2', fontSize: 'text-sm font-medium', shadow: 'shadow-sm', duration: 'transition-all duration-200', hoverState: 'bg-primary text-secondary border-secondary' },
    { name: 'Form TextInput', padding: 'px-4 py-3', margin: 'mt-1.5 mb-1', fontSize: 'text-md', shadow: 'shadow-inner focus:shadow-emerald/20', duration: 'transition-all duration-200', hoverState: 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white' },
    { name: 'Food Card', padding: 'p-5 pb-6', margin: 'm-0', fontSize: 'Title: text-xl, Desc: text-sm', shadow: 'shadow-sm hover:shadow-navy border border-gray-100', duration: 'transition-all duration-300', hoverState: 'hover:scale-[1.01] hover:border-secondary/30' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs flex justify-end"
            id="ds-backdrop-overlay"
          >
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-cream text-darkgray h-full shadow-2xl flex flex-col overflow-hidden border-l border-secondary/30"
              id="ds-drawer-container"
            >
              {/* Header */}
              <div className="bg-primary text-cream p-6 border-b border-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-secondary/25 rounded-md border border-secondary text-secondary">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl tracking-wide font-semibold text-secondary">Design System</h2>
                    <p className="text-xs text-cream/75 font-mono">VEGA HALL &bull; UI/UX Specification Document</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-cream/10 rounded-full transition-colors text-cream/70 hover:text-cream"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sub-tab switcher */}
              <div className="bg-primary/95 px-6 py-2 overflow-x-auto flex gap-1 border-b border-secondary/20 scrollbar-none">
                {[
                  { id: 'colors', label: 'Color Tokens', icon: Palette },
                  { id: 'typography', label: 'Typography', icon: Type },
                  { id: 'spacing', label: 'Layout Spacing', icon: Layout },
                  { id: 'components', label: 'Component Specs', icon: Box },
                  { id: 'animations', label: 'Interactions', icon: Sliders },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 border-b-2 font-sans text-xs uppercase font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'border-secondary text-secondary'
                          : 'border-transparent text-cream/70 hover:text-cream hover:border-cream/30'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Specs Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Visual design note */}
                <div className="bg-primary/5 border border-secondary/20 rounded-lg p-4 flex items-start gap-3">
                  <Sparkles size={18} className="text-secondary shrink-0 mt-0.5" />
                  <div className="text-xs text-darkgray/80 leading-relaxed">
                    <span className="font-semibold text-primary">Responsive Design Tokens:</span> Tailor-made for mobile (320px - 767px), tablet (768px - 1023px), and desktop (1024px+). Tap any hex or element structure to copy tokens to your workspace.
                  </div>
                </div>

                {activeTab === 'colors' && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2 flex items-center justify-between">
                      <span>Brand Palette Values</span>
                      <span className="font-mono text-xs text-gray-400">Contrast Approved &bull; WCAG AA</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {colors.map((color) => (
                        <div key={color.hex} className="flex bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className={`w-28 h-28 shrink-0 ${color.tailwind}`} />
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-sans font-semibold text-primary">{color.name}</h4>
                              <p className="text-xs text-gray-500 mt-1">{color.desc}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="font-mono text-xs bg-cream px-2 py-1 rounded text-primary">HEX: {color.hex}</span>
                              <button
                                onClick={() => copyToClipboard(color.hex)}
                                className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                              >
                                {copiedText === color.hex ? (
                                  <>
                                    <Check size={12} className="text-accent-green" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy size={12} /> Copy Token
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'typography' && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2">Typography Hierarchy & Scaling</h3>
                    <div className="space-y-4">
                      {typography.map((t, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-sans font-semibold text-primary text-sm uppercase tracking-wider">{t.tag}</h4>
                              <p className="text-xs text-gray-400 font-serif italic mt-0.5">{t.description}</p>
                            </div>
                            <span className="font-mono text-[11px] bg-secondary/10 text-secondary px-2 py-0.5 rounded border border-secondary/20">
                              {t.fontFamily}
                            </span>
                          </div>

                          {/* Preview container */}
                          <div className="py-2 px-3 bg-cream/50 rounded border border-gray-50 text-darkgray font-sans">
                            <span className={t.cssClass}>Vega Hall Fine Dining</span>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-[11px] text-gray-500 pt-1">
                            <div><span className="text-primary font-medium">Desktop:</span> {t.fontSizeDesktop}</div>
                            <div><span className="text-primary font-medium">Mobile:</span> {t.fontSizeMobile}</div>
                            <div><span className="text-primary font-medium">Line-Height:</span> {t.lineHeight}</div>
                            <div><span className="text-primary font-medium">Tracking:</span> {t.tracking}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'spacing' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2 mb-3">Responsive Layout Breakpoints</h3>
                      <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs">
                        <div className="bg-white rounded-lg border border-gray-100 p-4">
                          <div className="text-secondary font-bold text-sm">MOBILE</div>
                          <div className="text-primary font-semibold mt-1">320px - 767px</div>
                          <div className="text-gray-400 mt-2 text-[11px]">1 Column Menu<br />Full-width inputs<br />Simple header</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-100 p-4">
                          <div className="text-secondary font-bold text-sm">TABLET</div>
                          <div className="text-primary font-semibold mt-1">768px - 1023px</div>
                          <div className="text-gray-400 mt-2 text-[11px]">2 Column Menu<br />Split forms layout<br />Interactive sidebar</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-100 p-4">
                          <div className="text-secondary font-bold text-sm">DESKTOP</div>
                          <div className="text-primary font-semibold mt-1">1024px+</div>
                          <div className="text-gray-400 mt-2 text-[11px]">3 Column Grid<br />Large hero banner<br />Full navbar overlay</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2 mb-3 font-medium">Standardized Grid Padding Rules</h3>
                      <ul className="space-y-2.5 font-sans text-xs text-gray-600">
                        <li className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0" />
                          <span><strong>Page Outer Margins:</strong> 16px (mobile) &bull; 32px (tablet) &bull; 48px to 64px max (desktop) in container wrapper.</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0" />
                          <span><strong>Section Vertical Padding:</strong> 40px (mobile) &bull; 80px (tablet) &bull; 112px maximum (desktop sections).</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 bg-accent-green rounded-full shrink-0" />
                          <span><strong>Card Grid Gap Rates:</strong> 16px (mobile rows) &bull; 24px (tablet squares) &bull; 32px (desktop layout grid gap).</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'components' && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2">Perfect UI Component CSS Specs</h3>
                    <div className="space-y-4">
                      {componentsSpecs.map((spec, i) => (
                        <div key={i} className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm space-y-3">
                          <div className="flex justify-between items-center bg-cream px-3 py-1.5 rounded border border-gray-100">
                            <h4 className="font-sans font-bold text-primary text-sm">{spec.name}</h4>
                            <span className="font-mono text-[10px] text-secondary font-semibold">ELEMENT {i+1}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] text-gray-500">
                            <div><strong className="text-darkgray font-sans">Padding:</strong> {spec.padding}</div>
                            <div><strong className="text-darkgray font-sans">Margin:</strong> {spec.margin}</div>
                            <div><strong className="text-darkgray font-sans">Font sizing:</strong> {spec.fontSize}</div>
                            <div><strong className="text-darkgray font-sans">Shadow token:</strong> {spec.shadow}</div>
                            <div><strong className="text-darkgray font-sans">Time transition:</strong> {spec.duration}</div>
                            <div className="col-span-2"><strong className="text-darkgray font-sans">Hover animation:</strong> {spec.hoverState}</div>
                          </div>

                          {/* Quick visual preview of the item */}
                          <div className="pt-2 flex justify-start items-center">
                            {spec.name === 'Primary Button' && (
                              <button className={`bg-primary text-cream border border-secondary/50 rounded-xs uppercase tracking-wider text-xs font-semibold ${spec.padding} ${spec.hoverState} ${spec.duration} ${spec.shadow}`}>
                                Primary Button
                              </button>
                            )}
                            {spec.name === 'Reserve CTA Button' && (
                              <button className={`bg-accent-green text-white rounded-md uppercase tracking-wide text-xs font-bold ${spec.padding} ${spec.hoverState} ${spec.duration} ${spec.shadow}`}>
                                Reserve Table
                              </button>
                            )}
                            {spec.name === 'Category Tab (Active)' && (
                              <button className="bg-primary text-secondary border border-secondary rounded-full font-sans text-xs px-5 py-2.5">
                                Soups (12)
                              </button>
                            )}
                            {spec.name === 'Form TextInput' && (
                              <div className="w-full max-w-xs">
                                <input
                                  type="text"
                                  placeholder="Focus to preview..."
                                  className="w-full text-xs border border-gray-300 rounded-md focus:outline-none placeholder-gray-400 bg-white focus:border-accent-green focus:ring-1 focus:ring-accent-green p-3 shadow-inner"
                                />
                              </div>
                            )}
                            {spec.name === 'Food Card' && (
                              <div className="w-full max-w-sm rounded-lg border border-gray-100 bg-white p-4 shadow-xs">
                                <div className="font-serif font-bold text-sm text-primary">Traditional Shah Plov</div>
                                <p className="text-xs text-gray-400 mt-1">Rich zaffaran basmati rice with lamb crown.</p>
                                <div className="text-secondary font-mono text-xs mt-2">₼35.00</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'animations' && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-medium border-b border-gray-200 pb-2">Interactive Triggers & Transitions</h3>
                    <div className="space-y-4">
                      {/* String bulb transition */}
                      <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm space-y-3">
                        <h4 className="font-sans font-semibold text-primary text-sm uppercase tracking-wide">Bulb Glow Effect (Hero String Lights)</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans">
                          Overhead warm garden illumination mimics high-end night catering. Individual bulbs animate alternately with fluctuating radial gradients to simulate actual wood garden events.
                        </p>
                        <div className="p-4 bg-primary/95 rounded flex items-center justify-center gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-yellow-200 glow-bulb animate-glow pointer-events-none mb-1" />
                            <span className="font-mono text-[9px] text-cream/60">Animate (Loop)</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-yellow-100/40 border border-yellow-300/40 hover:bg-yellow-200 hover:glow-bulb transition-all duration-300 cursor-pointer mb-1" />
                            <span className="font-mono text-[9px] text-cream/60">Hover State</span>
                          </div>
                        </div>
                        <div className="font-mono text-[10px] text-gray-400 p-2.5 bg-cream/70 rounded">
                          CSS Keyframe: <code>glow 3s ease-in-out infinite alternate</code>
                        </div>
                      </div>

                      {/* Modal fade in */}
                      <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm space-y-3">
                        <h4 className="font-sans font-semibold text-primary text-sm uppercase tracking-wide">Modal Display Entrance</h4>
                        <p className="text-xs text-gray-500 font-sans">
                          Success prompt scales up using a quick spring curve from 95% to 100% mapped with a light opacity backdrop screen block fade.
                        </p>
                        <div className="font-mono text-[10px] text-gray-400 p-2.5 bg-cream/70 rounded">
                          Framer Motion: <code>initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.25 }}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-white border-t border-gray-150 p-4 shrink-0 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>VEGA HALL STYLE GUIDE 1.0</span>
                <span>BAKU, AZERBAIJAN</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
