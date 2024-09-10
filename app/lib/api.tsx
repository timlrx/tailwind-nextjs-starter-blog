export const api_path = "https://rabasu.github.io/family-line-api/"

export const getHorsesParams = async () => {
  const horses = await fetch(`${api_path}horses/data/`).then((res) => res.json())
  console.log(horses)
  return horses.map((horse) => ({
    slug: horse.slug,
  }));
}

export const getHorse = async (slug: string) => {
  const horse = await fetch(`${api_path}horses/data${slug}`).then((res) => res.json())
  return horse;
};

export async function getHorses() {
  const responce = await fetch(`${api_path}horses/data`).then((res) => res.json());
  return responce;
};