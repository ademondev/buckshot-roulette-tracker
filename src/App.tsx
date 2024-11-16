import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

type ShotState = 'STATELESS' | 'LIVE' | 'BLANK'

export default function Component() {
  const [liveShots, setLiveShots] = useState(0)
  const [blankShots, setBlankShots] = useState(0)
  const [shotArray, setShotArray] = useState<ShotState[]>([])

  useEffect(() => {
    const totalShots = liveShots + blankShots
    setShotArray(Array(totalShots).fill('STATELESS'))
  }, [liveShots, blankShots])

  const updateShotState = (index: number, newState: ShotState) => {
    const newShotArray = [...shotArray]
    newShotArray[index] = newState
    setShotArray(newShotArray)
  }

  const resetAll = () => {
    setLiveShots(0)
    setBlankShots(0)
    setShotArray([])
  }

  const getShotColor = (state: ShotState) => {
    switch (state) {
      case 'LIVE': return 'bg-destructive'
      case 'BLANK': return 'bg-primary'
      default: return 'bg-secondary'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Buckshot Roulette Shot Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-center text-lg">Live Rounds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-destructive">{liveShots}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-center text-lg">Blank Rounds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-center text-primary">{blankShots}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="live-shots">LIVE SHOTS</Label>
              <Slider
                id="live-shots"
                min={0}
                max={12}
                step={1}
                value={[liveShots]}
                onValueChange={(value) => setLiveShots(value[0])}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blank-shots">BLANK SHOTS</Label>
              <Slider
                id="blank-shots"
                min={0}
                max={12}
                step={1}
                value={[blankShots]}
                onValueChange={(value) => setBlankShots(value[0])}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {shotArray.map((shot, index) => (
              <Popover key={index}>
                <PopoverTrigger>
                  <div
                    className={`w-8 h-8 rounded-full ${getShotColor(shot)} transition-colors duration-200`}
                    role="button"
                    aria-label={`Shot ${index + 1}: ${shot}`}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="flex flex-col">
                    <Button
                      onClick={() => updateShotState(index, 'LIVE')}
                      variant="destructive"
                      className="rounded-none"
                    >
                      LIVE
                    </Button>
                    <Button
                      onClick={() => updateShotState(index, 'BLANK')}
                      className="rounded-none"
                    >
                      BLANK
                    </Button>
                    <Button
                      onClick={() => updateShotState(index, 'STATELESS')}
                      variant="secondary"
                      className="rounded-none"
                    >
                      RESET
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={resetAll} variant="outline" className="w-full">
            Reset All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
