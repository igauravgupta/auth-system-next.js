export default function ProfilePage({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Profile page {params.id}</p>
    </div>
  );
}
