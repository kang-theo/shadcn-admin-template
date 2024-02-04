import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardStatisticProps{
  title: string;
  icon: React.ReactNode;
  content: {
    statistic: string;
    percent: string;
  }
}

export function DashboardStatistic({
  title,
  icon,
  content,
}: DashboardStatisticProps){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content.statistic}</div>
        <p className="text-xs text-muted-foreground">
          {content.percent}
        </p>
      </CardContent>
    </Card>
  );
}