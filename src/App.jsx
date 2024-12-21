import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NIM from './NIM';
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import Home from './components/main/Home';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Access from "./components/auth/Access";
import Overview from './components/dashboard/Overview/Overview';
import Structure from './components/dashboard/Structure/Structure';
import { DataContextProvider } from './components/context/DataContext';
import Profile from './components/dashboard/Profile/Profile';
import NewChat from "./components/dashboard/newChat/NewChat";
import LoadSpace from './components/dashboard/LoadSpace/LoadSpace';
import SpacesList from './components/dashboard/SpacesList/SpacesList';
import SpaceInfo from './components/dashboard/info/SpaceInfo';
import NewWebChat from './components/dashboard/newChat/NewWebChat';
import WebSpacesList from './components/dashboard/SpacesList/WebSpacesList';
import CodeTrash from './components/dashboard/trash/CodeTrash';
import WebTrash from './components/dashboard/trash/WebTrash';
import LoadWebSpace from './components/dashboard/LoadSpace/LoadWebSpace';
import WebspaceVanilla from './components/dashboard/makeitlive/WebspaceVanilla';
import WebSpaceInfo from './components/dashboard/info/WebSpaceInfo';
import Admin from './components/admin/Admin';
import SharedSpaceList from './components/dashboard/shared/SharedSpaceList';
import WebViewerMode from './components/dashboard/shared/ViewerMode/WebViewerMode';
import CodeEditorMode from './components/dashboard/shared/EditorMode/CodeEditorMode';
import WebEditorMode from './components/dashboard/shared/EditorMode/WebEditorMode';
import CodeViewerSharedMode from './components/dashboard/shared/ViewerMode/CodeViewerMode';
import Contact from './components/main/contact/Contact';
import NeedsSpark from './components/main/needSpark/NeedsSpark';
import Timer from './components/dashboard/LoadSpace/timer/Timer';
import Terms from './components/terms-and-use/Terms';
import CodeTemplates from './components/dashboard/templates/CodeTemplates';
import WebTemplates from './components/dashboard/templates/WebTemplates';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserAuthContextProvider>
          <DataContextProvider>
            <Routes>
              <Route path='' element={<Navigate to="home" />} />
              <Route path='home' element={<Home />} />
              <Route path='contact' element={<Contact />} />
              <Route path='need-spark' element={<NeedsSpark />} />
              <Route path='auth' element={<Access />} />
              <Route path='terms-of-use' element={<Terms />} />
              <Route path='ws/:id' element={<WebspaceVanilla />} />
              <Route path='dashboard' element={
                <ProtectedRoute>
                  <Structure />
                </ProtectedRoute>} >
                <Route path='' element={<Navigate to="home" />} />
                <Route path='space/new' element={
                  <ProtectedRoute>
                    <NewChat />
                  </ProtectedRoute>} />
                <Route path='space/templates' element={
                  <ProtectedRoute>
                    <CodeTemplates />
                  </ProtectedRoute>} />
                <Route path='webspace/templates' element={
                  <ProtectedRoute>
                    <WebTemplates />
                  </ProtectedRoute>} />
                <Route path='shared/list' element={
                  <ProtectedRoute>
                    <SharedSpaceList />
                  </ProtectedRoute>} />
                <Route path='admin/spaces' element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>} />
                <Route path='webspace/new' element={
                  <ProtectedRoute>
                    <NewWebChat />
                  </ProtectedRoute>} />
                <Route path='space/:id' element={
                  <ProtectedRoute>
                    <LoadSpace />
                  </ProtectedRoute>} />
                <Route path='space/info/:id' element={
                  <ProtectedRoute>
                    <SpaceInfo />
                  </ProtectedRoute>} />
                <Route path='webspace/info/:id' element={
                  <ProtectedRoute>
                    <WebSpaceInfo />
                  </ProtectedRoute>} />
                <Route path='shared/codespace/view/:id' element={
                  <ProtectedRoute>
                    <CodeViewerSharedMode />
                  </ProtectedRoute>} />
                <Route path='shared/codespace/edit/:id' element={
                  <ProtectedRoute>
                    <CodeEditorMode />
                  </ProtectedRoute>} />
                <Route path='shared/webspace/view/:id' element={
                  <ProtectedRoute>
                    <WebViewerMode />
                  </ProtectedRoute>} />
                <Route path='shared/webspace/edit/:id' element={
                  <ProtectedRoute>
                    <WebEditorMode />
                  </ProtectedRoute>} />
                <Route path='webspace/:id' element={
                  <ProtectedRoute>
                    <LoadWebSpace />
                  </ProtectedRoute>} />
                <Route path='space/list' element={
                  <ProtectedRoute>
                    <SpacesList />
                  </ProtectedRoute>} />
                <Route path='webspace/list' element={
                  <ProtectedRoute>
                    <WebSpacesList />
                  </ProtectedRoute>} />

                <Route path='profile' element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>} />

                <Route path='trash/codespace' element={
                  <ProtectedRoute>
                    <CodeTrash />
                  </ProtectedRoute>} />
                <Route path='trash/webspace' element={
                  <ProtectedRoute>
                    <WebTrash />
                  </ProtectedRoute>} />

                <Route path='*' element={<Navigate to="home" />} />
                <Route path='home' element={
                  <ProtectedRoute>
                    <Overview />
                  </ProtectedRoute>} />
              </Route>
              <Route path='nvidia' element={
                <ProtectedRoute>
                  <NIM />
                </ProtectedRoute>}
              />
            </Routes>
          </DataContextProvider>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App