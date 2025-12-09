import { BannerHome } from '@/pages/app/home/banner-home'
import { ExploreHome } from './explore-home'
import { CarouselCard } from '@/components/corousel-card'

export function Home() {
  return (
    <div className="w-full">
      <div className="w-full bg-[url(/imgs/home/img-banner-home.png)] bg-cover bg-no-repeat px-5">
        <div className="mx-auto max-w-[1250px] px-5">
          <BannerHome />
        </div>
      </div>

      <div className="mx-auto max-w-[1250px] p-5">
        <CarouselCard title="Tendencias" />
        <ExploreHome />
      </div>
    </div>
  )
}
