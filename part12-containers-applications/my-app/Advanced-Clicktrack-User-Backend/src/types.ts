interface OverallData {
	numMeasures: number;
	mtc: number;
}

interface Rhythm {
	bpms: [number, number];
	timeSig: [number, number];
	accentedBeats: number[];
}

export interface Section {
	overallData: OverallData;
	rhythms: Rhythm[];
	id: string;
}