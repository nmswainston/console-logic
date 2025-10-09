export default function ThemeTest() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-ink mb-4">Theme Token Test</h2>
      
      {/* Test bg-brand-600 */}
      <div className="p-4 bg-brand-600 text-white rounded-lg">
        <p className="font-semibold">bg-brand-600 utility</p>
        <p className="text-sm opacity-90">Background: #00c2ff</p>
      </div>
      
      {/* Test text-ink */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <p className="text-ink font-semibold">text-ink utility</p>
        <p className="text-sm text-ink opacity-80">Text color: #f0f6fc</p>
      </div>
      
      {/* Test bg-surface */}
      <div className="p-4 bg-surface rounded-lg">
        <p className="text-ink font-semibold">bg-surface utility</p>
        <p className="text-sm text-ink opacity-80">Background: #1a2238</p>
      </div>
      
      {/* Test brand-700 */}
      <div className="p-4 bg-brand-700 text-white rounded-lg">
        <p className="font-semibold">bg-brand-700 utility</p>
        <p className="text-sm opacity-90">Background: #0091bf</p>
      </div>
    </div>
  )
}
