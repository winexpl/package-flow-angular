export interface Package {
    id: string;
    weeklyDownloads: number;
    dependencyCount: number;
    dependencies: string[] | null;
}